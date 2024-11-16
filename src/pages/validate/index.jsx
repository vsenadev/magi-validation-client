import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { http } from "../../environment/http.environment";
import "./validate.css";

export default function Validate() {
    const routeParam = useParams();
    const [delivery, setDelivery] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState({ isVisible: false, message: "", isSuccess: false });

    useEffect(() => {
        http.get(`v1/delivery/validation/route/${routeParam.id}`).then((res) => {
            setDelivery(res.data);
        });
    }, [routeParam.id]);

    const handleSubmit = () => {
        const payload = {
            id_route: routeParam.id,
            email: email,
            password: password,
        };

        http.put("v1/delivery/validate", payload)
            .then((res) => {
                const { status, message } = res.data;
                setModal({
                    isVisible: true,
                    message,
                    isSuccess: status,
                });
            })
            .catch(() => {
                setModal({
                    isVisible: true,
                    message: "Erro no servidor. Tente novamente.",
                    isSuccess: false,
                });
            });
    };

    const closeModal = () => {
        setModal({ isVisible: false, message: "", isSuccess: false });
    };

    return (
        <section className="validate-page">
            <div className="delivery-info">
                <span>Entrega: {delivery.delivery_name}</span>
                <span>Remetente: {delivery.sender}</span>
                <span>Destinatário: {delivery.recipient}</span>
                <span>Endereço: {delivery.street}, {delivery.number} - {delivery.city}</span>
            </div>
            <div className="credentials">
                <h2>Credenciais do destinatário</h2>
                <span>Insira abaixo seu login e senha para desbloqueio da trava</span>
                <span>Certifique-se de estar a 100m do local da entrega</span>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>LIBERAR TRAVA</button>
            </div>
            {modal.isVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <div className={`icon ${modal.isSuccess ? "success" : "error"}`}>
                            {modal.isSuccess ? "✔" : "✖"}
                        </div>
                        <p>{modal.message}</p>
                        <button onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </section>
    );
}
