import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Controls from "./components/Controls";
import PostCard from "./components/PostCard";
import Pagination from "./components/Pagination";

const API_BASE = "https://suitmedia-backend.suitdev.com/api/ideas";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(() => +localStorage.getItem("page") || 1);
  const [size, setSize] = useState(() => +localStorage.getItem("size") || 10);
  const [sort, setSort] = useState(() => localStorage.getItem("sort") || "-published_at");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Simpan state ke localStorage agar tidak reset saat refresh
      localStorage.setItem("page", page);
      localStorage.setItem("size", size);
      localStorage.setItem("sort", sort);

      const url = `${API_BASE}?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`;

      try {
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
        });

        const json = await res.json();

        if (Array.isArray(json.data)) {
          setPosts(json.data);
        } else {
          setPosts([]);
        }

        if (json.meta && typeof json.meta.total === "number") {
          setTotal(json.meta.total);
        } else {
          setTotal(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPosts([]);
        setTotal(0);
      }

      setLoading(false);
    };

    fetchData();
  }, [page, size, sort]);

  return (
    <>
      <Header />
      <Banner />
      <Controls
        page={page}
        size={size}
        sort={sort}
        total={total}
        onChangePageSize={(value) => {
          setPage(1); // reset ke halaman pertama saat ganti size
          setSize(value);
        }}
        onChangeSort={(value) => {
          setPage(1); // reset ke halaman pertama saat ganti sort
          setSort(value);
        }}
      />
      <div className="post-list">
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>No posts available.</p>
        )}
      </div>
      <Pagination
        page={page}
        total={total}
        size={size}
        onPageChange={(num) => setPage(num)}
      />
    </>
  );
}

export default App;
