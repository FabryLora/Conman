import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserAdmin({ user }) {
    const { fetchAllUsers, provincias } = useStateContext();
    const [updateView, setUpdateView] = useState(false);
    const [updateInfo, setUpdateInfo] = useState({
        name: user?.name,
        email: user?.email,
        password: "",
        password_confirmation: "",
        razon_social: user?.razon_social,
        dni: user?.dni,
        telefono: user?.telefono,
        direccion: user?.direccion,
        provincia: user?.provincia,
        localidad: user?.localidad,
        codigo_postal: user?.codigo_postal,
    });

    const update = (ev) => {
        ev.preventDefault();
        const payload = { ...updateInfo };

        axiosClient.put(`/users/${user.id}`, payload).then(() => {
            fetchAllUsers();
        });
    };

    const deleteUser = () => {
        axiosClient.delete(`/users/${user.id}`).then(() => {
            fetchAllUsers();
        });
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px] text-center text-lg">
            <td>{user.name}</td>
            <td>{user.razon_social}</td>
            <td>{user.dni}</td>
            <td>{user.provincia}</td>
            <td>{user.localidad}</td>
            <td>{user.email}</td>
            <td>
                <button
                    onClick={() => setUpdateView(true)}
                    className="bg-blue-500 text-white px-2 rounded-md"
                >
                    Editar
                </button>
                <button
                    onClick={deleteUser}
                    className="bg-red-500 text-white px-2 rounded-md"
                >
                    Eliminar
                </button>
            </td>
            {updateView && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-md shadow-md border text-black">
                    <form
                        onSubmit={update}
                        className="w-fit h-full flex flex-col gap-3"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2 col-span-2">
                                <label htmlFor="name">Nombre de usuario</label>
                                <input
                                    value={updateInfo.name}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            name: ev.target.value,
                                        });
                                    }}
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
                                    value={updateInfo.password}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            password: ev.target.value,
                                        });
                                    }}
                                    className="w-full h-[45px] border pl-2"
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password_confirmation">
                                    Confirmar contraseña
                                </label>
                                <input
                                    value={updateInfo.password_confirmation}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            password_confirmation:
                                                ev.target.value,
                                        });
                                    }}
                                    className="w-full h-[45px] border pl-2"
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={updateInfo.email}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            email: ev.target.value,
                                        });
                                    }}
                                    className="w-full h-[45px] border pl-2"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="razon_social">
                                    Razón Social
                                </label>
                                <input
                                    value={updateInfo.razon_social}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            razon_social: ev.target.value,
                                        });
                                    }}
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
                                    value={updateInfo.dni}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            dni: ev.target.value,
                                        });
                                    }}
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
                                    value={updateInfo.telefono}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            telefono: ev.target.value,
                                        });
                                    }}
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
                                    value={updateInfo.direccion}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            direccion: ev.target.value,
                                        });
                                    }}
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
                                        value={updateInfo.provincia}
                                        onChange={(ev) => {
                                            setUpdateInfo({
                                                ...updateInfo,
                                                provincia: ev.target.value,
                                            });
                                        }}
                                        className="py-2 border h-[45px]"
                                        name="provincia"
                                        id="provincia"
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
                                        value={updateInfo.localidad}
                                        onChange={(ev) => {
                                            setUpdateInfo({
                                                ...updateInfo,
                                                localidad: ev.target.value,
                                            });
                                        }}
                                        className="py-2 border h-[45px]"
                                        name="localidad"
                                        id="localidad"
                                    >
                                        <option value="">
                                            Selecciona una localidad
                                        </option>
                                        {provincias
                                            .find(
                                                (pr) =>
                                                    pr.name ===
                                                    updateInfo.provincia
                                            )
                                            ?.localidades.map((loc, index) => (
                                                <option
                                                    key={index}
                                                    value={loc.name}
                                                >
                                                    {loc.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="codigo_postal">
                                        Codigo postal
                                    </label>
                                    <input
                                        value={updateInfo.codigo_postal}
                                        onChange={(ev) => {
                                            setUpdateInfo({
                                                ...updateInfo,
                                                codigo_postal: ev.target.value,
                                            });
                                        }}
                                        className="border py-2 pl-2 h-[45px]"
                                        type="text"
                                        name="codigo_postal"
                                        id="codigo_postal"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button
                                onClick={() => setUpdateView(false)}
                                className="w-[325px] h-[47px] bg-primary-red text-white self-center my-5"
                            >
                                CANCELAR
                            </button>
                            <button
                                className="w-[325px] h-[47px] bg-blue-500 text-white self-center my-5"
                                type="submit"
                            >
                                ACTUALIZAR USUARIO
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </tr>
    );
}
