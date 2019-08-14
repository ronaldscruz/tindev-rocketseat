import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import io from 'socket.io-client';

import "./index.css";

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import itsamatch from "../../assets/itsamatch.png";

export default function Main({ match }){
	const [devs, setDevs] = useState([]);
	const [matchDev, setMatchDev] = useState(null);

	useEffect(() => {
		async function loadDevs(){
			const api_response = await api.get("devs", {
				headers: {
					user_id: match.params.id
				}
			}).catch(err => (setDevs(["Erro ao consultar os dados na API."])));

			setDevs(api_response.data);
		}

		loadDevs();
	}, [match.params.id]);

	useEffect(() => {
		const socket = io("http://localhost:3333", {
			query: { user_id: match.params.id }
		});

		socket.on("match", dev => {
			setMatchDev(dev);
		})

	}, [match.params.id]);

	async function handleLike(id){
		await api.post(`devs/${id}/likes`, null, {
			headers: {
				user_id: match.params.id
			}
		});

		setDevs(devs.filter(dev => dev._id !== id));
	}

	async function handleDislike(id){
		await api.post(`devs/${id}/dislikes`, null, {
			headers: {
				user_id: match.params.id
			}
		});

		setDevs(devs.filter(dev => dev._id !== id));
	}

	return(
		<div className="main-container">
			<Link to="/"><img src={logo} alt="Tindev"/></Link>
				{devs.length > 0 ? 
					(
						<ul>
							{devs.map(dev => (
								<li key={dev._id}>
									<img src={dev.avatar || "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fmoonvillageassociation.org%2Fwp-content%2Fuploads%2F2018%2F06%2Fdefault-profile-picture1-744x744.jpg&f=1"} alt={`Foto de ${dev.name || "desconhecido"}`}/>
									<footer>
										<strong>{dev.name || "Tindev vazio :("}</strong>
										<p>{dev.bio || <i>Descrição vazia.</i>}</p>
									</footer>
									<div className="rating-buttons">
										<button type="button" onClick={() => handleLike(dev._id)} >
											<img src={like} alt="Like"/>
										</button>
										<button type="button" onClick={() => handleDislike(dev._id)}>
											<img src={dislike} alt="Dislike"/>
										</button>
									</div>
								</li>
							))}
						</ul>
					)
					:
					(
						<div className="empty-tindev">Seu Tindev está vazio :(</div>
					)
				}

			{
				matchDev && (
					<div className="match-container">
						<img src={itsamatch} alt="It's a Match!" />
						<img className="match-avatar" src={matchDev.avatar} alt={`Foto de ${matchDev.name}`} />
						<strong className="match-name" > {matchDev.name} </strong>
						<p className="match-bio" >{matchDev.bio} </p>
						<button className="close-match" type="button" onClick={() => setMatchDev(null)} >LEGAL!</button>
					</div>
				)
			}
		</div>
	);
}