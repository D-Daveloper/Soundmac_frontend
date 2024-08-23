import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { home_post } from "../data/index";
import logo from "../assets/icons/logo.svg";
import { Heart, Share2 } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams(); // Extract the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const articleId = parseInt(id, 10);
    const filteredArticle = home_post.find((post) => articleId === post.id);
    console.log(filteredArticle);
    if (filteredArticle) {
      setArticle(filteredArticle);
    } else {
      console.error("Article not found!");
    }
  }, [id]);

  if (!article) {
    return <p className="h-[100dvh]">Loading...</p>;
  }
  return (
    <div>
      <section className="bg-homebg py-10">
        <div className="mx-auto w-[70%] max-lg:w-[90%]">
          <p className="text-text">
            Home {">"} Posts {">"} {article.Title}
          </p>
          <article>
            <h1 className="text-2xl font-bold leading-normal text-text md:text-[2.8vw]">
              {article.Title}
            </h1>
            <div className="flex gap-3 py-6">
              <img src={logo} alt="" className="rounded-full bg-black" />
              <div>
                <h3>Soundmac</h3>
                <p>Published {article.time}</p>
              </div>
            </div>
            <div>
              <div className="">
                <img
                  src={article.imgURL}
                  alt=""
                  className="h-[530px] w-full rounded-[20px] object-none object-top max-md:h-full max-md:object-cover"
                />
              </div>
              <div className="my-10 grid grid-cols-1 gap-8 text-justify lg:grid-cols-2">
                <p>{article.body}</p>
                <p>{article.body}</p>
              </div>
              <div className="grid gap-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <img src={article.imgURL} alt="" className="rounded-[20px]" />
                  <p>{article.body}</p>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <img
                    src={article.imgURL}
                    alt=""
                    className="order-2 rounded-[20px] max-lg:order-1"
                  />
                  <p className="order-1 max-lg:order-2">{article.body}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <hr className="border-1 my-3 border-gray-800" />
        <div className="p-6">
          <h1 className="text-2xl font-bold leading-normal text-text md:text-[2.8vw]">
            view other related posts
          </h1>
          <div className="flex flex-wrap justify-between gap-3">
            {home_post.slice(0, 3).map((item, index) => (
              <Link to={`/post/${item.id}`}>
                <article
                  key={index}
                  className="flex justify-center rounded-2xl bg-white p-3 hover:shadow-lg"
                >
                  <div className="flex w-[400px] flex-col justify-between hover:cursor-pointer max-lg:w-full">
                    <div>
                      <img
                        src={item.imgURL}
                        alt=""
                        className="w-full object-cover"
                      />
                    </div>
                    <h2 className="font-semibold leading-normal text-text">
                      {item.Title}
                    </h2>
                    <p className="text-sm">{item.time}</p>
                    <div className="flex justify-between text-base font-semibold">
                      <p className="flex gap-3 text-icon">
                        <button className="fill-none">
                          <Heart
                            stroke="#10414A"
                            className={"hover:scale-110 focus:scale-110"}
                          />
                        </button>
                        {item.likes}
                      </p>
                      <p className="flex gap-3 text-icon">
                        <button>
                          <Share2
                            stroke="#10414A"
                            className={"hover:scale-110 focus:scale-110"}
                          />
                        </button>
                        {item.shares}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
