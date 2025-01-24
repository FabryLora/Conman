export default function ProductRowAdmin({ productObject, subCategory }) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17
            </td>
            <td className="px-6 py-4">{productObject?.code}</td>
            <td className="px-6 py-4">{productObject?.name}</td>
            <td className="px-6 py-4">{productObject?.price}</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">{subCategory}</td>
        </tr>
    );
}
