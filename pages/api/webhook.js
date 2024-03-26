import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";
import { useState, useEffect, useRef } from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import Head from "next/head";
import { Alert } from 'reactstrap';
import { useSearchParams } from 'next/navigation'

import { useRouter } from 'next/router';
import { Button } from "reactstrap";
import axios from 'axios';

export default function handler(req, res) {
  console.log(req.query)
  res.status(200).json({ name:req.query['hello']})
}
