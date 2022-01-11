import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);
// Load all categories
  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

    // Remove category
const handleRemove = async(slug) => {
        if(window.confirm("Delete ?")){
            setLoading(true)
            removeCategory(slug, user.token)
            .then((res) => {
                setLoading(false)
                toast.error(`${res.data.name} deleted`)
                loadCategories();
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.response.data)
            })
        }

    }
// Create category
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        console.log("RES", res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

 

// step 4
const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading.....</h4>
          ) : (
            <h4>Create Category</h4>
          )}

         <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/> 

         {/* Step 2: Search feature */}
            <LocalSearch keyword = {keyword} setKeyword={setKeyword}/>

         {/* Step 5: use filter function on searched */}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span onClick = {() => handleRemove(c.slug)} className="btn btn-sm float-right">
                <DeleteOutlined className="text-danger"/>
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning"/>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
