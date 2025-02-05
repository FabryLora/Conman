import { useState } from "react";
import axiosClient from "../axios";
import AdministradorRow from "../components/AdministradorRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function Administradores() {
    const [error, setError] = useState(false);

    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [password_confirmation, setPassword_confirmation] = useState();

    const { allAdmins, fetchAllAdmins } = useStateContext();
    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/signup-admin", { name, password, password_confirmation })
            .then(() => {
                fetchAllAdmins();
            })

            .catch((error) => {
                if (error.response) {
                    setError(
                        Object.values(error.response.data.errors || {})
                            .flat()
                            .join(" ")
                    );
                } else {
                    setError("Ocurrió un error. Intenta nuevamente.");
                }
            });
    };

    return (
        <div className="flex flex-col items-center py-20">
            <div className="flex flex-col gap-2 top-10 right-10 bg-white shadow-md p-5 font-roboto-condensed w-fit h-fit border">
                {error && <div className="h-99 w-99">{error}</div>}
                <h2 className="font-bold text-[24px] py-5">
                    Crear Administrador
                </h2>
                <form
                    onSubmit={onSubmit}
                    className="w-fit h-full flex flex-col justify-around gap-3"
                    action=""
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="user">Usuario</label>
                            <input
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                className="w-[328px] h-[45px] border pl-2"
                                type="text"
                                name="user"
                                id="user"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="w-[328px] h-[45px] border pl-2"
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password_confirmation">
                                Confirmar Contraseña
                            </label>
                            <input
                                value={password_confirmation}
                                onChange={(ev) =>
                                    setPassword_confirmation(ev.target.value)
                                }
                                className="w-[328px] h-[45px] border pl-2"
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                            />
                        </div>
                    </div>

                    <button
                        className="w-[325px] h-[47px] bg-primary-red text-white self-center my-5"
                        type="submit"
                    >
                        REGISTRAR
                    </button>
                </form>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Administrador
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allAdmins.map((info, index) => (
                        <AdministradorRow key={index} adminObject={info} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
