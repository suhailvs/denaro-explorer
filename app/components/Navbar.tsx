'use client'
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [id, setId] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let link = '';
    if (id.length == 45){
      link = "/address/";
    } else if (id.length < 45){
      link = "/block/";
    } else if (id.length > 45){
      link = "/transaction/";
    }
    if (link != '' && id.length > 0) {
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
          <Link className="navbar-brand" href="/">
            <img
              src="https://denaro.is/denaro200x200.png"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
          </Link>
          <input
            className="form-control me-2 form-control-lg"
            type="search"
            placeholder="Search for blocks, addresses or transactions"
            aria-label="Search for blocks, addresses or transactions"
            onChange={(e: any) => {
              setId(e.target.value);
            }}
          />
          <button className="btn btn-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
