export default function CategoryAdminCard({ category }) {
    return (
        <div className="table-row">
            <div className="table-cell">
                <img src={category?.image_url} alt="" />
            </div>
            <div className="table-cell">{category?.name}</div>

            <div className="table-cell">
                <input
                    type="checkbox"
                    value={category?.destacado}
                    checked={category?.destacado}
                    name=""
                    id=""
                />
            </div>
            <div className="table-cell">{category?.order}</div>
        </div>
    );
}
