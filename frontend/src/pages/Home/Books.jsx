import React, { useEffect, useState } from "react";
import { MdLibraryBooks } from "react-icons/md";
import Store from "../books/Store";
import { FaLocationArrow } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import Loading from "../../components/Loading";

const categories = [
  "choose your genre",
  "fiction",
  "mystery",
  "thriller",
  "fantasy",
  "science fiction",
  "romance",
  "historical",
  "horror",
  "adventure",
  "non-fiction",
  "biography",
  "memoir",
  "self-help",
  "poetry",
  "graphic novel",
  "business",
  "marketing",
];

const Books = () => {
  // const [books, setBooks] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("choose your genre");

  // useEffect(() => {
  //   fetch("books.json")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();

  const filteredBooks =
    selectedCategory === "choose your genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error fetching books. Please try again later.</div>;
  }

  return (
    <div className="py-10">
      <h2 className="text-3xl text-grayBrown font-extrabold mb-6 mx-4 flex gap-2">
        Books <MdLibraryBooks />
      </h2>

      <div className="mb-8 flex items-center mx-4 ">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-grayBrown border-gray-400 px-4 py-2 rounded-lg text-white focus:outline-none shadow-lg cursor-pointer "
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
          1180: { slidesPerView: 3, spaceBetween: 50 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper rounded-lg mb-2 "
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <Store book={book} />
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="w-full max-w-[50rem] h-full cursor-pointer bg-primary px-4 py-3 flex items-center gap-4 justify-center mx-auto my-auto rounded-lg sm:hover:bg-secondary mt-4 shadow-xl">
        <Link to="/exploreBooks" className="text-white font-semibold text-lg">
          Explore All Books
        </Link>
        <FaLocationArrow className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default Books;
