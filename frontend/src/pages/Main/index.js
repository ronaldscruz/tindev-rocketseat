import React, {useEffect, useState} from 'react';
import api from '../../services/api';

import "./index.css";

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

export default function Main({ match }){
	const [devs, setDevs] = useState([]);

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

	return(
		<div className="main-container">
			<img src={logo} alt="Tindev"/>
			<ul>
				{devs.map(dev => (
					<li>
						<img src={dev.avatar || "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fmoonvillageassociation.org%2Fwp-content%2Fuploads%2F2018%2F06%2Fdefault-profile-picture1-744x744.jpg&f=1"} alt={`Foto de ${dev.name || "desconhecido"}`}/>
						<footer>
							<strong>{dev.name || "Tindev vazio :("}</strong>
							<p>{dev.bio || "Que tal convidar novos amigos para cá?"}</p>
						</footer>
						<div className="rating-buttons">
							<button type="button">
								<img src={like} alt="Like"/>
							</button>
							<button type="button">
								<img src={dislike} alt="Dislike"/>
							</button>
						</div>
					</li>
				))}	
			</ul>
		</div>
	);
}