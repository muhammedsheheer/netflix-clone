import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [movieData, setMovieData] = useState({
		name: "",
		key: "",
		type: "",
		published_at: "",
	});

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODZkZDlmN2M2ZGE1NjhhYmZlY2NjNTcyNTAxNWJlOCIsIm5iZiI6MTcyMDUyNTk3Ni4xNDM1NTIsInN1YiI6IjY2OGQyM2E2OGZlOTQ4MmQyMmE3YjRmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E-94BrnwcyhgLfTNhZN5EVsLzk5b88KS05dv4UVlDvo",
		},
	};

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
			options
		)
			.then((response) => response.json())
			.then((response) => setMovieData(response.results[0]))
			.catch((err) => console.error(err));
	}, []);
	return (
		<div className="player">
			<img
				src={back_arrow_icon}
				alt=""
				onClick={() => {
					navigate(-2);
				}}
			/>
			<iframe
				width="90%"
				height="90%"
				src={`https://www.youtube.com/embed/${movieData.key}`}
				title="trailer"
				frameBorder="0"
				allowFullScreen
			></iframe>
			<div className="player-info">
				<p>{movieData.published_at.slice(0, 10)}</p>
				<p>{movieData.name}</p>
				<p>{movieData.type}</p>
			</div>
		</div>
	);
};

export default Player;
