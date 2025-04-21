import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../api";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../stylesheets/Home.css";
import Spinner from "react-bootstrap/Spinner";

const Home = ({
  getArticles,
  setGetArticles,
  err,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  isLoading,
  setisLoading,
}) => {
  const { topic } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setisLoading(true);
    fetchArticles(undefined, "created_at", "desc")
      .then((articles) => {
        setGetArticles(articles);
        setisLoading(false);
        if (topic && articles.some((article) => article.topic === topic)) {
          setErr(null);
        } else if (topic) {
          setErr("Topic not found");
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  }, [setGetArticles, sortBy, sortOrder, topic]);

  const top3Articles =
    getArticles.length > 0
      ? getArticles
          .slice()
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 3)
      : null;

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p className="initial-load-msg">
          Initial load may take a moment as the site is hosted on a free tier.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1
        style={{ fontFamily: "serif", textAlign: "center", fontSize: "80px" }}
      >
        Welcome to Scoop
      </h1>

      <Row>
        <Col>
          {top3Articles.length > 0 && (
            <Carousel className="carousel">
              <Carousel.Item interval={5000}>
                <img
                  src={top3Articles[0].article_img_url}
                  alt={top3Articles[0].title}
                />
                <Carousel.Caption>
                  <h3>{top3Articles[0].title}</h3>
                  <Link to={`/articles/${top3Articles[0].article_id}`}>
                    <button>Read article</button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  src={top3Articles[1].article_img_url}
                  alt={top3Articles[1].title}
                />
                <Carousel.Caption>
                  <h3>{top3Articles[1].title}</h3>
                  <Link to={`/articles/${top3Articles[1].article_id}`}>
                    <button>Read article</button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  src={top3Articles[2].article_img_url}
                  alt={top3Articles[2].title}
                />
                <Carousel.Caption>
                  <h3>{top3Articles[2].title}</h3>
                  <Link to={`/articles/${top3Articles[2].article_id}`}>
                    <button>Read article</button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          )}
        </Col>
        <Col className="home-text">
          <h2
            style={{
              fontFamily: "serif",
              textAlign: "center",
              fontSize: "40px",
            }}
          >
            About
          </h2>

          <p>
            Welcome to ScoopNews, your go-to destination for the latest trending
            articles in coding, football, and cooking. Stay informed with
            up-to-date news, insightful analyses, and engaging stories across
            these diverse fields. Whether you're a tech enthusiast, sports fan,
            or culinary explorer, ScoopNews has something for you. Dive in and
            discover the hottest topics today!
          </p>
        </Col>
      </Row>
    </>
  );
};

export default Home;
