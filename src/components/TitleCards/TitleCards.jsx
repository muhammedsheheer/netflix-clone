import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
	const cardRef = useRef();
	const [moviedata, setMovieData] = useState([]);

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODZkZDlmN2M2ZGE1NjhhYmZlY2NjNTcyNTAxNWJlOCIsIm5iZiI6MTcyMDUyNTk3Ni4xNDM1NTIsInN1YiI6IjY2OGQyM2E2OGZlOTQ4MmQyMmE3YjRmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E-94BrnwcyhgLfTNhZN5EVsLzk5b88KS05dv4UVlDvo",
		},
	};

	const handleWheel = (event) => {
		event.preventDefault();
		cardRef.current.scrollLeft += event.deltaY;
	};
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${
				category ? category : "now_playing"
			}?language=en-US&page=1`,
			options
		)
			.then((response) => response.json())
			.then((response) => setMovieData(response.results))
			.catch((err) => console.error(err));

		cardRef.current.addEventListener("wheel", handleWheel);
	}, []);
	return (
		<div className="title-cards">
			<h2>{title ? title : "Popular On Netflix"}</h2>
			<div className="card-list" ref={cardRef}>
				{moviedata.map((card, index) => (
					<Link to={`/player/${card.id}`} className="card" key={index}>
						<img
							src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
							alt=""
						/>
						<p>{card.original_title}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TitleCards;
