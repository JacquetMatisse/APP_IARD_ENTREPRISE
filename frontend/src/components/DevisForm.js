import React, { useState } from "react";
import axios from "axios";

function DevisForm({ onRetour }) {
	const [form, setForm] = useState({
		numero_opportunite: "",
		nom_client: "",
		vendeur: "",
		type_garantie: "",
		type_bien: "",
		destination_ouvrage: "",
		types_travaux: "",
		cout_ouvrage: "",
		taux_seul_do: "",
		taux_seul_trc: "",
		prime_seule_do: "",
		prime_seule_trc: "",
		presence_existant: false,
		client_vip: false,
		souhaite_rcmo: false,
		// Montants de garanties
		garantie_ouvrage: "",
		garantie_rc: "",
		garantie_maintenance: "",
		garantie_mesure_conservatoire: "",
		// Montants de franchise
		franchise_batiment: "",
		franchise_cat_nat: "",
		franchise_rc_maitre: "",
		franchise_rc_intervenant: "",
		franchise_maintenance: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	// Calcul dynamique des primes
	const cout = parseFloat(form.cout_ouvrage) || 0;
	const tauxDO = parseFloat(form.taux_seul_do) || 0;
	const tauxTRC = parseFloat(form.taux_seul_trc) || 0;
	const primeDO = (tauxDO * cout).toFixed(2);
	const primeTRC = (tauxTRC * cout).toFixed(2);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => {
			const newForm = {
				...prev,
				[name]: type === "checkbox" ? checked : value,
			};
			// Calcul automatique des primes
			const cout =
				parseFloat(name === "cout_ouvrage" ? value : newForm.cout_ouvrage) || 0;
			const tauxDO =
				parseFloat(name === "taux_seul_do" ? value : newForm.taux_seul_do) || 0;
			const tauxTRC =
				parseFloat(name === "taux_seul_trc" ? value : newForm.taux_seul_trc) ||
				0;
			newForm.prime_seule_do = (tauxDO * cout).toFixed(2);
			newForm.prime_seule_trc = (tauxTRC * cout).toFixed(2);
			return newForm;
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess(false);
		axios
			.post("http://localhost:8000/api/devis/", form)
			.then(() => {
				setLoading(false);
				setSuccess(true);
				// Optionnel : reset du formulaire
				setForm({
					numero_opportunite: "",
					nom_client: "",
					vendeur: "",
					type_garantie: "",
					type_bien: "",
					destination_ouvrage: "",
					types_travaux: "",
					cout_ouvrage: "",
					taux_seul_do: "",
					taux_seul_trc: "",
					prime_seule_do: "",
					prime_seule_trc: "",
					presence_existant: false,
					client_vip: false,
					souhaite_rcmo: false,
					// Montants de garanties
					garantie_ouvrage: "",
					garantie_rc: "",
					garantie_maintenance: "",
					garantie_mesure_conservatoire: "",
					// Montants de franchise
					franchise_batiment: "",
					franchise_cat_nat: "",
					franchise_rc_maitre: "",
					franchise_rc_intervenant: "",
					franchise_maintenance: "",
				});
			})
			.catch(() => {
				setLoading(false);
				setError("Erreur lors de la création du devis.");
			});
	};

	const garantie = form.type_garantie;
	const isDO = garantie === "DO seule";
	const isTRC = garantie === "TRC seule";
	const isDuo = garantie === "Duo";

	return (
		<form
			onSubmit={handleSubmit}
			style={{ maxWidth: 500, margin: "0 auto" }}>
			<h2 style={{ color: "#003399", textAlign: "center" }}>Nouveau devis</h2>
			{error && (
				<div
					style={{ color: "#e2001a", marginBottom: 16, textAlign: "center" }}>
					{error}
				</div>
			)}
			{success && (
				<div
					style={{
						color: "#fff",
						background: "#003399",
						borderRadius: 6,
						padding: "12px 0",
						marginBottom: 16,
						textAlign: "center",
						fontWeight: 600,
						letterSpacing: "0.5px",
					}}>
					✅ Devis créé avec succès !
				</div>
			)}
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				<div>
					<label>Numéro d'opportunité *</label>
					<input
						name='numero_opportunite'
						type='text'
						value={form.numero_opportunite}
						onChange={handleChange}
						required
						placeholder='Ex : 2024-001'
					/>
				</div>
				<div>
					<label>Nom du client *</label>
					<input
						name='nom_client'
						type='text'
						value={form.nom_client}
						onChange={handleChange}
						required
						placeholder='Ex : Dupont SARL'
					/>
				</div>
				<div>
					<label>Vendeur *</label>
					<input
						name='vendeur'
						type='text'
						value={form.vendeur}
						onChange={handleChange}
						required
						placeholder='Ex : Martin'
					/>
				</div>
				<div>
					<label>Type de garantie *</label>
					<select
						name='type_garantie'
						value={form.type_garantie}
						onChange={handleChange}
						required>
						<option value=''>Sélectionner</option>
						<option value='DO seule'>DO seule</option>
						<option value='TRC seule'>TRC seule</option>
						<option value='Duo'>Duo</option>
					</select>
				</div>
				<div>
					<label>Type de bien *</label>
					<select
						name='type_bien'
						value={form.type_bien}
						onChange={handleChange}
						required>
						<option value=''>Sélectionner</option>
						<option value='Habitation'>Habitation</option>
						<option value='Hors habitation'>Hors habitation</option>
					</select>
				</div>
				<div>
					<label>Destination de l'ouvrage *</label>
					<input
						name='destination_ouvrage'
						type='text'
						value={form.destination_ouvrage}
						onChange={handleChange}
						required
						placeholder='Ex : Maison individuelle'
					/>
				</div>
				<div>
					<label>Types de travaux *</label>
					<select
						name='types_travaux'
						value={form.types_travaux}
						onChange={handleChange}
						required>
						<option value=''>Sélectionner</option>
						<option value='Ouvrage neuf'>Ouvrage neuf</option>
						<option value='Rénovation légère'>Rénovation légère</option>
						<option value='Rénovation lourde'>Rénovation lourde</option>
					</select>
				</div>
				<div>
					<label>Coût de l'ouvrage (€) *</label>
					<input
						name='cout_ouvrage'
						type='number'
						min='0'
						value={form.cout_ouvrage}
						onChange={handleChange}
						required
						placeholder='Ex : 2000000'
					/>
				</div>
				{isDO && (
					<div>
						<label>Taux seul DO</label>
						<input
							name='taux_seul_do'
							type='number'
							step='0.001'
							min='0'
							value={form.taux_seul_do}
							onChange={handleChange}
							required
							placeholder='Ex : 0.002'
						/>
						<span style={{ marginLeft: 8 }}>
							Prime seule DO : <b>{primeDO}</b> €
						</span>
					</div>
				)}
				{isTRC && (
					<div>
						<label>Taux seul TRC</label>
						<input
							name='taux_seul_trc'
							type='number'
							step='0.001'
							min='0'
							value={form.taux_seul_trc}
							onChange={handleChange}
							required
							placeholder='Ex : 0.0015'
						/>
						<span style={{ marginLeft: 8 }}>
							Prime seule TRC : <b>{primeTRC}</b> €
						</span>
					</div>
				)}
				{isDuo && (
					<>
						<div>
							<label>Taux seul DO</label>
							<input
								name='taux_seul_do'
								type='number'
								step='0.001'
								min='0'
								value={form.taux_seul_do}
								onChange={handleChange}
								required
								placeholder='Ex : 0.002'
							/>
							<span style={{ marginLeft: 8 }}>
								Prime seule DO : <b>{primeDO}</b> €
							</span>
						</div>
						<div>
							<label>Taux seul TRC</label>
							<input
								name='taux_seul_trc'
								type='number'
								step='0.001'
								min='0'
								value={form.taux_seul_trc}
								onChange={handleChange}
								required
								placeholder='Ex : 0.0015'
							/>
							<span style={{ marginLeft: 8 }}>
								Prime seule TRC : <b>{primeTRC}</b> €
							</span>
						</div>
						<div style={{ marginTop: 8 }}>
							<b>
								Prime totale Duo :{" "}
								{(parseFloat(primeDO) + parseFloat(primeTRC)).toFixed(2)} €
							</b>
						</div>
					</>
				)}
				<div style={{ display: "flex", gap: 24 }}>
					<label>
						<input
							name='presence_existant'
							type='checkbox'
							checked={form.presence_existant}
							onChange={handleChange}
						/>
						Présence d'existant
					</label>
					<label>
						<input
							name='client_vip'
							type='checkbox'
							checked={form.client_vip}
							onChange={handleChange}
						/>
						Client VIP
					</label>
					<label>
						<input
							name='souhaite_rcmo'
							type='checkbox'
							checked={form.souhaite_rcmo}
							onChange={handleChange}
						/>
						Souhaite RCMO
					</label>
				</div>
				{/* Champs Montants de garanties */}
				{(isTRC || isDuo) && (
					<div
						style={{
							border: "1px solid #003399",
							borderRadius: 6,
							padding: 30,
							marginTop: 16,
						}}>
						<h4 style={{ color: "#003399" }}>Montants de garanties</h4>
						<div>
							<label>Dommage matériels à l'ouvrage (€)</label>
							<input
								name='garantie_ouvrage'
								type='number'
								min='0'
								value={form.garantie_ouvrage}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label>Responsabilité civile (€)</label>
							<input
								name='garantie_rc'
								type='number'
								min='0'
								value={form.garantie_rc}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label>Maintenance-visite (€)</label>
							<input
								name='garantie_maintenance'
								type='number'
								min='0'
								value={form.garantie_maintenance}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label>Mesure conservatoire (€)</label>
							<input
								name='garantie_mesure_conservatoire'
								type='number'
								min='0'
								value={form.garantie_mesure_conservatoire}
								onChange={handleChange}
							/>
						</div>
					</div>
				)}
				{/* Champs Montants de franchise */}
				{(isDO || isTRC || isDuo) && (
					<div
						style={{
							border: "1px solid #003399",
							borderRadius: 6,
							padding: 30,
							marginTop: 16,
						}}>
						<h4 style={{ color: "#003399" }}>Montants de franchise</h4>
						{/* Dommage subis par les ouvrages de bâtiments */}
						{(isDO || isDuo) && (
							<div>
								<label>Dommage subis par les ouvrages de bâtiments (€)</label>
								<input
									name='franchise_batiment'
									type='number'
									min='0'
									value={form.franchise_batiment}
									onChange={handleChange}
								/>
							</div>
						)}
						{/* Catastrophes naturelles */}
						{(isDO || isDuo) && (
							<div>
								<label>Catastrophes naturelles (€)</label>
								<input
									name='franchise_cat_nat'
									type='number'
									min='0'
									value={form.franchise_cat_nat}
									onChange={handleChange}
								/>
							</div>
						)}
						{/* RC maître d'ouvrage */}
						{(isTRC || isDuo || isDO) && (
							<div>
								<label>
									Responsabilité civile - Assuré maître d'ouvrage (€)
								</label>
								<input
									name='franchise_rc_maitre'
									type='number'
									min='0'
									value={form.franchise_rc_maitre}
									onChange={handleChange}
								/>
							</div>
						)}
						{/* RC intervenants */}
						{(isTRC || isDuo || isDO) && (
							<div>
								<label>Responsabilité civile - Assuré intervenants (€)</label>
								<input
									name='franchise_rc_intervenant'
									type='number'
									min='0'
									value={form.franchise_rc_intervenant}
									onChange={handleChange}
								/>
							</div>
						)}
						{/* Maintenance-visite */}
						{(isTRC || isDuo || isDO) && (
							<div>
								<label>Maintenance-visite (€)</label>
								<input
									name='franchise_maintenance'
									type='number'
									min='0'
									value={form.franchise_maintenance}
									onChange={handleChange}
								/>
							</div>
						)}
					</div>
				)}
			</div>
			<div style={{ textAlign: "center", marginTop: 24 }}>
				<button
					type='submit'
					disabled={loading}>
					{loading ? "Envoi en cours..." : "Valider"}
				</button>
				<button
					type='button'
					onClick={onRetour}
					style={{
						background: "#fff",
						color: "#003399",
						border: "1px solid #003399",
						marginLeft: 12,
					}}>
					Retour
				</button>
			</div>
		</form>
	);
}

export default DevisForm;
