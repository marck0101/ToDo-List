import react from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection"; // pra conectar com o firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function headleRegister(e) {
    // como estamos tratando de uma submit, precisa passar um event
    e.preventDefault(); // para não recarregaar a pagina
    if (email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          // alert("sucesso ao Registrar");
          navigate("/admin", { replace: true });
        })
        .cach(() => {
          toast.error("Erro ao Fazer Cadastro");
        });
    } else {
      toast.error("Algum Campo Vazio");
    }
  }

  return (
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta.</span>

      <form className="form" onSubmit={headleRegister}>
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
        <button type="submit">Cadastrar</button>
        <Link className="button-link" to="/">
          Já possui uma conta? <b style={{ color: "#3366ff" }}>Faça login!</b>
        </Link>
      </form>
    </div>
  );
}
