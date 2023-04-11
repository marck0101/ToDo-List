import { useEffect, useState } from "react";
import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false); // verificando se o usuário ainda está logado ou não
  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user) => {
        //se tem usuário logado
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };
          localStorage.setItem("@detailUser", JSON.stringify(userData));
          setLoading(false);
          setSigned(true);
        } else {
          //nao possui user logado
          setLoading(false);
          setSigned(false);
        }
      });
    }
    checkLogin();
  }, []);

  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    // se não estiver logado vai ser forçado a voltar para a pagina de login
    return <Navigate to="/" />;
  }
  return children;
}
