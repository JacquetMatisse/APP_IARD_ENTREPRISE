import React, { useEffect, useState } from "react";
import axios from "axios";

function DevisList({ onNouveau }) {
	const [devis, setDevis] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/devis/")
			.then((res) => setDevis(res.data));
	}, []);

	const filteredDevis = devis.filter((d) => {
		const searchLower = search.toLowerCase();
		return (
			d.numero_opportunite.toLowerCase().includes(searchLower) ||
			d.nom_client.toLowerCase().includes(searchLower) ||
			String(d.cout_ouvrage).toLowerCase().includes(searchLower) ||
			(d.vendeur && d.vendeur.toLowerCase().includes(searchLower))
		);
	});

	return (
		<div>
			<h2>Liste des devis</h2>
			<input
				type='text'
				placeholder='Rechercher par client, numéro ou coût...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				style={{ marginBottom: 16, padding: 6, width: 320 }}
			/>
			<table>
				<thead>
					<tr>
						<th>Numéro</th>
						<th>Client</th>
						<th>Vendeur</th>
						<th>Coût</th>
						<th>Prime</th>
						<th>Documents</th>
					</tr>
				</thead>
				<tbody>
					{filteredDevis.map((d) => {
						let prime = "";
						if (d.type_garantie === "DO seule") prime = d.prime_seule_do + " €";
						else if (d.type_garantie === "TRC seule")
							prime = d.prime_seule_trc + " €";
						else if (d.type_garantie === "Duo")
							prime = `${d.prime_seule_do} € + ${d.prime_seule_trc} € = ${(
								parseFloat(d.prime_seule_do || 0) +
								parseFloat(d.prime_seule_trc || 0)
							).toFixed(2)} €`;
						return (
							<tr key={d.id}>
								<td>{d.numero_opportunite}</td>
								<td>{d.nom_client}</td>
								<td>{d.vendeur}</td>
								<td>{d.cout_ouvrage} €</td>
								<td>{prime}</td>
								<td>
									<a
										href={`http://localhost:8000/api/devis/${d.id}/docx/`}
										target='_blank'
										rel='noopener noreferrer'>
										Word
									</a>{" "}
									|{" "}
									<a
										href={`http://localhost:8000/api/devis/${d.id}/pdf/`}
										target='_blank'
										rel='noopener noreferrer'>
										PDF
									</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<button onClick={onNouveau}>Nouveau devis</button>
		</div>
	);
}

export default DevisList;
