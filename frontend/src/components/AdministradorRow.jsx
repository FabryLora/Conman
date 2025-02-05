export default function AdministradorRow({ adminObject }) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto">
                {adminObject.name}
            </td>
            <td>asdsd</td>
        </tr>
    );
}
