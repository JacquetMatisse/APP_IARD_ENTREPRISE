import React, { useState } from "react";
import DevisList from "./components/DevisList";
import DevisForm from "./components/DevisForm";
import axaLogo from "./assets/logo.png";
import "./App.css";

function App() {
	const [page, setPage] = useState("list");

	return (
		<div>
			<header
				style={{
					background: "#fff",
					borderBottom: "3px solid #003399",
					padding: "18px 0 10px 0",
					marginBottom: 30,
					textAlign: "center",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 16,
				}}>
				<img
					src={axaLogo}
					alt='AXA'
					style={{ height: 48, verticalAlign: "middle" }}
				/>
				<span
					style={{
						fontSize: "2.2rem",
						color: "#003399",
						fontWeight: 700,
						verticalAlign: "middle",
						letterSpacing: "1px",
					}}>
					Tarification IARD Entreprises
				</span>
			</header>
			<main style={{ maxWidth: 900, margin: "0 auto" }}>
				{page === "list" ? (
					<DevisList onNouveau={() => setPage("form")} />
				) : (
					<DevisForm onRetour={() => setPage("list")} />
				)}
			</main>
		</div>
	);
}

export default App;
