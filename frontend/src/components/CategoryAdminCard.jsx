export default function CategoryAdminCard({ category }) {
    return (
        <div className="table-row">
            <div className="table-cell">
                <img src={category?.image_url} alt="" />
            </div>
            <div className="table-cell">{category?.name}</div>
            <div className="table-cell">
                {category?.subcategories.map((subCategory) => (
                    <p key={subCategory.id}>{subCategory?.name}</p>
                ))}
            </div>
            <div className="table-cell">{category?.destacado}</div>
            <div className="table-cell">{category?.order}</div>
        </div>
    );
}
