import React from 'react';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

export default function Main({ match }){
	return(
		<div className="main-container">
			<img src={logo} alt="Tindev"/>
			<ul>
				<li>
					<img src="https://avatars2.githubusercontent.com/u/36777554?v=4" alt="Foto de Ronald S. Cruz"/>
					<footer>
						<strong>Ronald S. Cruz</strong>
						<p>18y, web developer. {"<"}/{">"} with 💜</p>
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
				<li>
					<img src="https://avatars3.githubusercontent.com/u/20933173?v=4" alt="Foto de Juliovaz"/>
					<footer>
						<strong>Juliovaz</strong>
						<p>Coding ideas for a better life :earth_americas: Front-end Developer</p>
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
				<li>
					<img src="https://avatars2.githubusercontent.com/u/30543111?v=4" alt="Foto de Vinícius Alves"/>
					<footer>
						<strong>Vinícius Alves</strong>
						<p>vejo o perigo à frente, esperanças são balas no pente</p>
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
				<li>
					<img src="https://avatars0.githubusercontent.com/u/30542437?v=4" alt="Foto de Vitor Hugo"/>
					<footer>
						<strong>Vitor Hugo</strong>
						<p>18y old, São Paulo - SP -\r\nTécnico em Informática. Futuro dev web.</p>
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
			</ul>
		</div>
	);
}