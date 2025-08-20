"use client";

interface User {
  id: string;
  name: string;
  login: string;
  avatar_url: Blob;
  url: string;
}

import { Input } from "@/components/ui/input";
import ProfileCard from "@/components/ui/profile-card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const repsonse = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(repsonse);
    };
  }, [value, delay]);

  return debouncedValue;
}

const User = () => {
  const [response, setResponse] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);

  const debouncedSearch = useDebounce(search, 300);

  const fetachUsers = async () => {
    try {
      const request = await axios.get("https://api.github.com/users");
      setResponse(request.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetachUsers();
  }, []);

  const filteredUsers = () => {
    if (!debouncedSearch) return response;

    return response.filter((user: User) =>
      user?.login?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  };

  if (loading) return <div>loading....</div>;

  return (
    <main className=" max-w-5xl mx-auto">
      <div className="mt-20">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        {/* <Button>Search</Button> */}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-20">
        {filteredUsers().map((user: User) => (
          <div key={user.id}>
            <Link href={`/users/${user.login}`}>
              <ProfileCard
                username={user.login}
                image={user.avatar_url}
                link={user.url}
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default User;
