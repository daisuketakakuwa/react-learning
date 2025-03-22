import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MenuHeader = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontSize: "25px", margin: "10px", borderBottom: "solid 1px black" }}>
      <Nav activeKey="/">
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/")}>HOME</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/policy-search")}>契約照会</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default MenuHeader;
