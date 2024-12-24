const BestSellingProducts = ({ products }:any) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Ürün Adı</th>
          <th>Satış Miktarı</th>
          <th>Toplam Gelir</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product:any) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>${product.price * product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default BestSellingProducts;