import React, { useEffect, useState } from 'react';
import './RateCalculator.css';
const handleEnterPress = e =>{
    if (e.keyCode === 13) {
        e.preventDefault();
        return e.target.value;
      }
    }

const RateCalculator = () => {

    const [products, setProducts] = useState([]);
    const [value, setValue] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [productId, setProductId] = useState([]);
    const [singleProducts, setSingleProducts] = useState([]);

    useEffect(() => {
        fetch(`https://exchangeratecalculatorapp.herokuapp.com/allProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            }
        })
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    useEffect(() => {
        fetch('https://exchangeratecalculatorapp.herokuapp.com/product?id=' + productId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            }
        })
            .then(res => res.json())
            .then(data => setSingleProducts(data));
    }, [productId])
    const [cdPerc, setCdPerc] = useState([]);
    const [rdPerc, setRdPerc] = useState([]);
    const [sdPerc, setSdPerc] = useState([]);
    const [vatPerc, setVatPerc] = useState([]);
    useEffect(() => {

        if (singleProducts.length) {
            setCdPerc(singleProducts[0].cd);
            setRdPerc(singleProducts[0].rd);
            setSdPerc(singleProducts[0].sd);
            setVatPerc(singleProducts[0].vat);

        }
    }, [productId])

    

    let insurance = value * 0.01;
    let charge = value * 0.01;
    let total1 = value + insurance + charge;
    let assessableValue = exchangeRate * total1;
    let CD = assessableValue * (cdPerc / 100)
    let RD = assessableValue * (rdPerc / 100)
    let SD = (assessableValue + CD + RD) * (sdPerc / 100);
    let VAT = (assessableValue + CD + RD + SD) * (vatPerc / 100);
    let total2 = assessableValue + CD + RD + SD + VAT
    return (
        <div className="container">
            <div className="row d-flex mt-5">
                <div className="col-7">

                    <div class="form-group row">
                        <label for="inputText" class="col-sm-2 col-form-label">Value($)</label>
                        <div class="col-sm-7">
                            <textarea onChange={(e) => setValue(parseFloat(e.target.value||0))} onKeyPress={(e)=>setValue(parseFloat(handleEnterPress(e)))} type="Text" class="form-control" id="inputText" ></textarea>
                        </div>
                    </div>
                    <table class="table table-borderless">

                        <tbody>
                            <tr>
                                <td>Insurance 1%</td>
                                <td>{insurance.toFixed(2) || 0} USD</td>
                            </tr>
                            <tr>
                                <td>Charge 1%</td>
                                <td>{charge.toFixed(2) || 0} USD</td>
                            </tr>

                        </tbody>
                        <tfoot >
                            <tr className="table-footer">
                                <td>Total Value</td>
                                <td>{total1.toFixed(2) || 0} USD</td>
                            </tr>
                        </tfoot>
                    </table>
                    <table class="table table-borderless">

                        <tbody>
                            <tr>
                                <td colspan="2">A/V</td>
                                <td class="col-sm-7 white-box">{assessableValue.toFixed(2)} TK</td>
                            </tr>
                            <tr>
                                <td class="col-sm-2">CD( % )</td>
                                <td class="col-sm-2 pr-5"><input onChange={(e) => setCdPerc(parseFloat(e.target.value||0))} onKeyPress={(e)=>setCdPerc(parseFloat(handleEnterPress(e)))} type="text" class="form-control mr-5" defaultValue={cdPerc} placeholder="%" ></input></td>
                                <td class="white-box">{CD.toFixed(2)} TK</td>
                            </tr>
                            <tr>
                                <td>RD( % )</td>
                                <td class="col-sm-2 pr-5"><input onChange={(e) => setRdPerc(parseFloat(e.target.value||0))} onKeyPress={(e)=>setRdPerc(parseFloat(handleEnterPress(e)))} type="text" class="form-control mr-5" defaultValue={rdPerc} placeholder="%"></input></td>
                                <td class="white-box">{RD.toFixed(2)} TK</td>
                            </tr>
                            <tr>
                                <td>SD( % )</td>
                                <td class="col-sm-2 pr-5"><input onChange={(e) => setSdPerc(parseFloat(e.target.value||0))} onKeyPress={(e)=>setSdPerc(parseFloat(handleEnterPress(e)))} type="text" class="form-control mr-5" defaultValue={sdPerc} placeholder="%"></input></td>
                                <td class="white-box">{SD.toFixed(2)} TK</td>
                            </tr>
                            <tr>
                                <td>VAT( % )</td>
                                <td class="col-sm-2 pr-5"><input onChange={(e) => setVatPerc(parseFloat(e.target.value||0))} onKeyPress={(e)=>setVatPerc(parseFloat(handleEnterPress(e)))} type="text" class="form-control mr-5" defaultValue={vatPerc} placeholder="%"></input></td>
                                <td class="white-box m-4">{VAT.toFixed(2)} TK</td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr className="table-footer">
                                <td colspan="2">Total Value</td>
                                <td class="text-right">{total2.toFixed(2)} TK</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="col-5">
                    <div class="form-group row">
                        <label for="inputText" class="col-sm-5 col-form-label">Exchange Rate</label>
                        <div class="col-sm-7">
                            <textarea onChange={(e) => setExchangeRate(parseFloat(e.target.value||0))} onKeyPress={(e)=>setExchangeRate(parseFloat(handleEnterPress(e)))} type="Text" class="form-control" id="inputText" ></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputText" class="col-sm-5 col-form-label">Product ID</label>
                        <div class="col-sm-7">
                            <textarea onChange={(e) => setProductId(parseInt(e.target.value))} onKeyPress={(e)=>setProductId(parseInt(handleEnterPress(e)))} type="Text" class="form-control" id="inputText" ></textarea>
                        </div>
                    </div>

                    <p className="text-danger m-5">N.B: PRESS ENTER IF YOU PASTE ANY VALUE</p>

                </div>
            </div>

        </div>
    );
};

export default RateCalculator;