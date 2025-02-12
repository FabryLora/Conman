import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import UserAdmin from "../components/UserAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function UsuariosAdmin() {
    const { setUserToken, provincias, allUsers, fetchAllUsers } =
        useStateContext();

    const [userSubmitInfo, setUserSubmitInfo] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        razon_social: "",
        dni: "",
        telefono: "",
        direccion: "",
        provincia: "",
        localidad: "",
        codigo_postal: "",
    });

    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/signup", userSubmitInfo)
            .then(({ data }) => {
                setUserToken(data.token);
                fetchAllUsers();
                toast.success("Usuario creado correctamente");
            })
            .catch((err) => {
                toast.error("Error al crear el usuario");
            });
    };

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setUserSubmitInfo({ ...userSubmitInfo, [name]: value });
    };

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <ToastContainer />
            <form
                onSubmit={onSubmit}
                className="w-fit h-full flex flex-col gap-3 py-20"
            >
                <h2 className="text-2xl">AGREGAR USUARIO</h2>

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2 col-span-2">
                        <label htmlFor="name">Nombre de usuario</label>
                        <input
                            value={userSubmitInfo.name}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border pl-2"
                            type="text"
                            name="name"
                            id="name"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            value={userSubmitInfo.password}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border pl-2"
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password_confirmation">
                            Confirmar contraseña
                        </label>
                        <input
                            value={userSubmitInfo.password_confirmation}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border pl-2"
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            value={userSubmitInfo.email}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border pl-2"
                            type="email"
                            name="email"
                            id="email"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="razon_social">Razón Social</label>
                        <input
                            value={userSubmitInfo.razon_social}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border pl-2"
                            type="text"
                            name="razon_social"
                            id="razon_social"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="dni">DNI / CUIT</label>
                        <input
                            value={userSubmitInfo.dni}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border pl-2"
                            type="text"
                            name="dni"
                            id="dni"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            value={userSubmitInfo.telefono}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border pl-2"
                            type="text"
                            name="telefono"
                            id="telefono"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            value={userSubmitInfo.direccion}
                            onChange={handleInputChange}
                            className="w-full h-[45px] border pl-2"
                            type="text"
                            name="direccion"
                            id="direccion"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-3 col-span-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="provincia">Provincia</label>
                            <select
                                value={userSubmitInfo.provincia}
                                onChange={(ev) =>
                                    setUserSubmitInfo({
                                        ...userSubmitInfo,
                                        provincia: ev.target.value,
                                        localidad: "",
                                    })
                                }
                                className="py-2 border h-[45px]"
                                name="provincia"
                                id="provincia"
                                required
                            >
                                <option value="">
                                    Selecciona una provincia
                                </option>
                                {provincias.map((pr) => (
                                    <option key={pr.id} value={pr.name}>
                                        {pr.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="localidad">Localidad</label>
                            <select
                                value={userSubmitInfo.localidad}
                                onChange={(ev) =>
                                    setUserSubmitInfo({
                                        ...userSubmitInfo,
                                        localidad: ev.target.value,
                                    })
                                }
                                className="py-2 border h-[45px]"
                                name="localidad"
                                id="localidad"
                                required
                            >
                                <option value="">
                                    Selecciona una localidad
                                </option>
                                {provincias
                                    .find(
                                        (pr) =>
                                            pr.name === userSubmitInfo.provincia
                                    )
                                    ?.localidades.map((loc, index) => (
                                        <option key={index} value={loc.name}>
                                            {loc.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="codigo_postal">Codigo postal</label>
                            <input
                                value={userSubmitInfo.codigo_postal}
                                onChange={handleInputChange}
                                className="border py-2 pl-2 h-[45px]"
                                type="text"
                                name="codigo_postal"
                                id="codigo_postal"
                                required
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="w-[325px] h-[47px] bg-primary-red text-white self-center my-5"
                    type="submit"
                >
                    AGREGAR USUARIO
                </button>
            </form>

            <div className="w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                            <th scope="col" className="px-6 py-3">
                                Usuario
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Razon social
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DNI / CUIT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Provincia
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Localidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user, index) => (
                            <UserAdmin key={index} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
