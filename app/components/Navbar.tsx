"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let link = "";
    if (id.length == 45) {
      link = "/address/";
    } else if (id.length < 45) {
      link = "/block/";
    } else if (id.length > 45) {
      link = "/transaction/";
    }
    if (link != "" && id.length > 0) {
      router.push(link + id);
    }
  };
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-md justify-content-center">
        <form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
          {/* <Link className="navbar-brand" href="/">
            <img
              src="https://denaro.is/denaro200x200.png"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
          </Link> */}
          <input
            id="searchbarbig"
            className="form-control me-2 form-control-lg"
            type="search"
            placeholder="Search for blocks, addresses or transactions"
            aria-label="Search for blocks, addresses or transactions"
            onChange={(e: any) => {
              setId(e.target.value);
            }}
          />
          <button className="btn btn-light" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
