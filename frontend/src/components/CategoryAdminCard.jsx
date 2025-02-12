import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
export default function CategoryAdminCard({ category }) {
    const { fetchCategoryInfo } = useStateContext();

    const [edit, setEdit] = useState(false);

    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [destacado, setDestacado] = useState();
    const [order, setOrder] = useState();
    const [link, setLink] = useState("");

    useEffect(() => {
        setName(category?.name);
        setDestacado(category?.destacado);
        setOrder(category?.order_value);
    }, [category]);

    const hanldeFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }

        formData.append("name", name);
        formData.append("destacado", destacado ? 1 : 0);
        formData.append("order_value", order);
        formData.append("link", "a");

        try {
            const response = await axiosClient.post(
                `/category/${category.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response);
            fetchCategoryInfo();
            toast.success("Categoria actualizada correctamente");
        } catch (error) {
            toast.error("Error al actualizar la categoria");
        }
    };

    const deleteCategory = async () => {
        try {
            const response = await axiosClient.post(
                `/category/${category.id}?_method=DELETE`
            );
            console.log(response);
            fetchCategoryInfo();
            toast.success("Categoria eliminada correctamente");
        } catch (error) {
            toast.error("Error al eliminar la categoria");
        }
    };

    return (
        <tr className=" border">
            <td className=" w-[90px] h-[90px]">
                <img
                    className="w-full h-full object-contain"
                    src={category?.image_url}
                    alt=""
                />
            </td>
            <td className=" align-middle">{name}</td>

            <td className=" align-middle">
                <input type="checkbox" checked={destacado} name="" id="" />
            </td>
            <td className=" align-middle">{order}</td>
            <td className=" align-middle">
                <button onClick={() => setEdit(!edit)}>
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                </button>
            </td>
            {edit && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <form
                        onSubmit={update}
                        className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start gap-2"
                    >
                        <label htmlFor="imagen">Imagen</label>
                        <input
                            type="file"
                            onChange={hanldeFileChange}
                            className="w-full border py-1 pl-2"
                        />
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border py-1 pl-2"
                        />

                        <label htmlFor="destacado">Destacado</label>
                        <div className="flex flex-row gap-1">
                            <input
                                id="destacado"
                                type="checkbox"
                                checked={destacado}
                                onChange={(e) => setDestacado(e.target.checked)}
                            />
                            <label htmlFor="destacado">
                                Marque esta casilla si quiere que la categoria
                                este en el inicio
                            </label>
                        </div>

                        <label htmlFor="order">Orden</label>
                        <input
                            type="text"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            className="w-full border py-1 pl-2"
                        />
                        <div className="flex flex-row gap-2">
                            <button
                                className="bg-green-500 text-white px-2 py-1"
                                type="submit"
                            >
                                Actualizar
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-2 py-1"
                                onClick={() => setEdit(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-2 py-1"
                                onClick={deleteCategory}
                            >
                                Eliminar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </tr>
    );
}
