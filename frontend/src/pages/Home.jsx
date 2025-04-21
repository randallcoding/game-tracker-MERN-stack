import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect (() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/games')
      .then((response) => {
        setGames(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div>Home</div>
  )
}

export default Home