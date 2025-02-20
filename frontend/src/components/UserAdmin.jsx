import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
        autorizado: user?.autorizado,
        discount: user?.discount,
    });

    const update = (ev) => {
        ev.preventDefault();
        const payload = { ...updateInfo };

        axiosClient
            .put(`/users/${user.id}`, payload)
            .then(() => {
                fetchAllUsers();
                toast.success("Usuario actualizado correctamente");
            })
            .catch(() => {
                toast.error("Error al actualizar el usuario");
            });
    };

    const deleteUser = () => {
        axiosClient
            .delete(`/users/${user.id}`)
            .then(() => {
                fetchAllUsers();
                toast.success("Usuario eliminado correctamente");
            })
            .catch(() => {
                toast.error("Error al eliminar el usuario");
            });
    };

    const autorizar = () => {
        axiosClient
            .put(`/users/${user.id}`, { autorizado: 1 })
            .then(() => {
                fetchAllUsers();
                toast.success("Usuario autorizado correctamente");
            })
            .catch(() => {
                toast.error("Error al autorizar el usuario");
            });
    };

    const desautorizar = () => {
        axiosClient
            .put(`/users/${user.id}`, { autorizado: 0 })
            .then(() => {
                fetchAllUsers();
                toast.success("Usuario desautorizado correctamente");
            })
            .catch(() => {
                toast.error("Error al desautorizar el usuario");
            });
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px] text-center text-lg">
            <td>{user.name}</td>

            <td className={user?.discount > 0 ? "text-green-500" : ""}>
                {user.discount}%
            </td>
            <td>{user.provincia}</td>
            <td>{user.localidad}</td>
            <td>
                {user?.autorizado == "1" ? (
                    <button
                        onClick={desautorizar}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                        Desautorizar
                    </button>
                ) : (
                    <button
                        onClick={autorizar}
                        className="bg-green-500 text-white px-2 py-1 rounded-md"
                    >
                        Autorizar
                    </button>
                )}
            </td>
            <td>{user.email}</td>
            <td>
                <div className="flex flex-col gap-2">
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
                </div>
            </td>
            {updateView && (
                <div className="absolute top-1/2 left-1/2 transform w-screen h-screen -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-5 text-black flex items-center justify-center">
                    <form
                        onSubmit={update}
                        className="w-fit h-fit p-5 rounded-md flex flex-col gap-3 bg-white"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2 col-span-2">
                                <label htmlFor="a">Nombre de usuario</label>
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
                                    id="a"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="b">Contraseña</label>
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
                                    id="b"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="c">Confirmar contraseña</label>
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
                                    id="c"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="d">Email</label>
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
                                    id="d"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="e">Razón Social</label>
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
                                    id="e"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="f">DNI / CUIT</label>
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
                                    id="f"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="g">Teléfono</label>
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
                                    id="g"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="h">Dirección</label>
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
                                    id="h"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="i">Descuento</label>
                                <input
                                    value={updateInfo.discount}
                                    onChange={(ev) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            discount: ev.target.value,
                                        });
                                    }}
                                    className="w-full h-[45px] border pl-2"
                                    type="text"
                                    name="direccion"
                                    id="i"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-3 col-span-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="j">Provincia</label>
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
                                        id="j"
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
                                    <label htmlFor="k">Localidad</label>
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
                                        id="k"
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
                                    <label htmlFor="l">Codigo postal</label>
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
                                        id="l"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 items-center justify-center">
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
