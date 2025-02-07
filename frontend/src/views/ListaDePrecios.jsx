import fileRed from "../assets/icons/file-red-icon.svg";

export default function ListaDePrecios() {
    return (
        <div className="w-full px-20 py-20">
            <table className=" border font-roboto-condensed w-full">
                <thead>
                    <tr className="bg-gray-300 font-bold">
                        <td className="h-[50px]"></td>
                        <td>Nombre</td>
                        <td>Formato</td>
                        <td>Peso</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-[100px]">
                        <td className="h-[50px] w-[120px]">
                            <img className="mx-auto" src={fileRed} alt="" />
                        </td>
                        <td>Lista de precios</td>
                        <td>1kg</td>
                        <td>1kg</td>
                        <td className="w-[500px]">
                            <button className="border mx-6 border-primary-red text-primary-red w-[184px] h-[47px]">
                                VER ONLINE
                            </button>
                            <button className="bg-primary-red text-white h-[47px] w-[184px]">
                                DESCARGAR
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
