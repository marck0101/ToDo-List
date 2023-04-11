import react from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection"; // pra conectar com o firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import "./home.css";

import { toast } from "react-toastify";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function headleLogin(e) {
    // como estamos tratando de uma submit, precisa passar um event
    e.preventDefault(); // para não recarregaar a pagina
    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password) // auth para conectar, email e senha para registrar
        .then(() => {
          // navegar para / admin
          // alert("sucesso ao Acessar");
          navigate("/admin", { replace: true }); // aqui vai dar replace no histórico de navegação
        })
        .cach(() => {
          toast.error("Erro ao Acessar");
        });
    } else {
      toast.error("Algum Campo Vazio");
    }
  }

  // function teste() {
  //   toast.success("success");
  //   toast.error("error");

  // }

  return (
    <div className="home-container">
      <h1>Lista De tarefas</h1>
      <span>Gerencie sua agenda de forma fácil.</span>

      <form className="form" onSubmit={headleLogin}>
        <input
          type="text"
          placeholder="digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          // autoComplete={false}
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Acessar</button>
        <Link className="button-link" to="/register">
          Não possui uma conta? <b style={{ color: "#3366ff" }}>Cadastre-se!</b>
        </Link>
      </form>
      {/* <button onClick={teste}>teste</button> */}
    </div>
  );
}
