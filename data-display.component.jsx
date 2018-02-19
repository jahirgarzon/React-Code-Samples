import React from 'react'
import leadService from '@app/services/lead.service';
import { BrowserRouter, Link } from 'react-router-dom'
import LeadStatus from '@app/constants/lead-status.js'
import tostada from '@app/helpers/Tostada.js'
import moment from 'moment'
import { FormattedDate } from 'react-intl'
class LeadsPaid extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        leadService.getPaidLeads()
            .then(i => this.setState({ items: i.items }))
            .catch(i => tostada.toaster({
                message: 'oops something went wrong',
                level: 'error'
            }));

    }

    clickHandler() {
        leadService.getPaidLeads(this.state.min, this.state.max)
            .then(i => this.setState({ items: i.items }))
            .catch(i => tostada.toaster({
                message: 'oops something went wrong',
                level: 'error'
            }));
    }

    inputHandler(e) {
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        });

    }



    render() {
        const leadInfoBox = this.state.items.map(
            item => {


                const a = moment(item.dateCreated);
                const b = moment(item.dateUpdated);
                const duration = b.from(a);


                return (<div key={item._id}>

                    <div className="property-item">
                        <Link to={"/about-us/" + item.providerId} className="property-image" >
                            <img className="img-responsive" src={item.logo} alt="company logo" />
                        </Link>

                        <h4 className="property-item-price">
                            Payout:
                                    <strong className="text-primary">
                                &nbsp; ${item.paymentAmount}
                            </strong>
                            < div className="pull-right margin-right-30">
                                <small>  <b>duration</b> </small> <br />
                                <small className="  text-danger">
                                    {duration}
                                </small>

                            </div>
                        </h4>

                        <ul className="property-item-features list-inline">
                            <li> opened: &nbsp;
                                      <FormattedDate value={item.dateCreated} day="numeric" month="long" year="numeric" />
                            </li>

                            <li >|</li>
                            <li>closed: &nbsp;
                                      <FormattedDate value={item.dateUpdated} day="numeric" month="long" year="numeric" />
                            </li>

                            <li style={{ listStyle: "none" }}>|</li>
                        </ul>


                        <p className="property-item-desc size-15">
                            {item.description}
                        </p>
                        <hr />

                        <hr />

                        <div className="property-item-btn ">
                            <Link to={"/about-us/" + item.providerId} >{item.providerName}</Link>
                            <Link to={`/provider-service/${item.providerId}#${item.serviceId}`}>{item.serviceName} </Link>
                        </div>
                    </div>
                </div>)
                })

                ||
           
                <div>
                Loading...
               </div>

        return (
            <div>
                <header className="text-center margin-top-40">
                    <h2 className="size-25">
                        Recent Payouts
               </h2>
                    <p className="weight-300">
                        Browse recently paid leads, and navigate to the company  or service page to learn more.
                </p>
                    <div className="float-left margin-left-60 ">
                        <form className="form-inline">
                            <div className="form-group row">
                                <label htmlFor=""> payment range</label>

                                <div className="input-group-sm">
                                    <input type="number"
                                        name="min"
                                        className="form-control"
                                        min="0"
                                        max="49999"
                                        placeholder="min"
                                        onChange={this.inputHandler} />
                                    <input
                                        type="number"
                                        name="max"
                                        className="form-control"
                                        min="1"
                                        max="50000"
                                        placeholder="max"
                                        onChange={this.inputHandler} />
                                    &nbsp;
                                    <button type="button" className="btn btn-primary btn-sm bg-black border-black" onClick={this.clickHandler} >Go</button>
                                </div>
                            </div>
                        </form>     </div>



                </header>
                {leadInfoBox.length ?
                     leadInfoBox : 
                <div className="text-center margin-left-30"> <h1> no results, try a different range</h1></div>}
            </div>

        )
    }

}

export default LeadsPaid