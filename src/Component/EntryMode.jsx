import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../Context';
import Spinner from 'react-spinner-material';
import { Scrollbars } from 'react-custom-scrollbars';
import { showAlert } from '../Common/CommonAlert';
import { setAuth } from '../reducer/action'
import checkfetcharticles from '../services/checkfetcharticles';
import '../css/style.css'
import '../css/main.css'
import Logout from './Logout';




const EntryMode = (props) => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    let [timer, setTimer] = useState(0)
    const [time, setTime] = useState({})
    let [seconds, setSeconds] = useState(20)
    const [articledetails, setArticleDetails] = useState([])
    const [{ userDetails }, dispatch] = useGlobalState();
    const [tableheader, setTableHeader] = useState(["Image", "Name", "Author", "Category Name"])


    useEffect(() => {
        let timeLeftVar = secondsToTime(seconds);
        setTime(timeLeftVar);
        startTimer()
    }, [])


    const startTimer = () => {
        if (timer == 0 && seconds > 0) {
            setTimer(setInterval(countDown, 1000))
        }

    }

    const resetTimer = () => {
        setSeconds(60)
        setTimer(0)
        let timeLeftVar = secondsToTime(seconds);
        setTime(timeLeftVar);
        startTimer()
    }

    const countDown = () => {

        seconds = seconds - 1;
        if (seconds >= 0) {
            if (seconds.toString().length > 1) {
                setTime(secondsToTime(seconds))
                setSeconds(seconds)

            }
            else {
                seconds = 0 + seconds;
                setTime(secondsToTime('0' + seconds))
                setSeconds('0' + seconds)
            }
        }
        if (seconds == 0) {
            console.log("endedA")
            fetchdetails()
            clearInterval(timer);
        }


    }


    const fetchdetails = async () => {
        setLoading(true)
        setArticleDetails([])
        try {
            const getArticleList = await checkfetcharticles();
            if (getArticleList.result.article) {
            setArticleDetails(getArticleList.result.article);
            dispatch(setAuth(true));
            }
            else{
                showAlert("Something went wrong")
            }
        }
        catch (error) {
            console.error(error);
            showAlert('Unable to load server. Please retry!')
        } finally {
            setLoading(false)
        }
    }

    const secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    return (
        <>

            <Logout />
            <div className="spin">
                <Spinner visible={loading}
                    spinnerColor={"rgba(0, 0, 0, 0.3)"} />
            </div>

            <div className="mt-100" style={{ "fontSize": "20px" }} align="center" >


                {time.s >= 10 ? <div>
                    0{time.m}:   {time.s}
                </div> :
                    <div>
                        0{time.m}:   0{time.s}
                    </div>

                }


                {time.s === 0 && time.m === 0 ? <button type="button" className="btn btn-primary" onClick={(e) => resetTimer(e)} id="reset" >Reset</button>
                    : ''}

            </div>

            <div className="tbl-holder">
                <table className="table table-striped table-advance table-hover table-bordered tbl-task  tbl-hhide">
                    <thead>
                        <tr>
                            {tableheader.map((item, key) => (
                                <th>{item}</th>
                            ))}
                        </tr>
                    </thead>

                </table>
                <Scrollbars style={{ height: 420 }}>
                    <table className="table table-striped table-advance table-hover table-bordered tbl-task mob-tbl" >

                        <tbody>
                            {articledetails.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td data-th="Image"><img src={item.image} style={{ "height": "55px", "width": "40px", "marginLeft": "5px" }} /></td>
                                        <td data-th="Name" >{item.name}</td>
                                        <td data-th="Author">{item.author}</td>
                                        <td data-th="Category">{item.categoryName}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Scrollbars>
            </div>

        </>
    )

}


export default EntryMode