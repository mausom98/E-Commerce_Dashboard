import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import { firebase } from '../firebaseConfig';
import { message } from "antd";

const db = firebase.firestore();
const success = () => {
    message.success("Product Successfully Deleted");
};
const error1 = () => {
    message.error("Error in Deleting");
};

const columns = [
    {
        name: "CurTime",
        label: "ID",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Name",
        label: "Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Brand",
        label: "Brand",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "Quantity",
        label: "Quantity in Ltr",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "Price",
        label: "Price",
        options: {
            filter: true,
            sort: false,
        }
    },
];



class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            selectedItems: []
        };
    }
    options = {
        filterType: 'checkbox',
        responsive: "scroll",
        onRowsDelete: (rowsDeleted) => {
            for (var key in rowsDeleted.data) {
                var doc = db.collection("Orders").where("CurTime", "==", (this.state.Data[rowsDeleted.data[key].dataIndex]).CurTime);
                doc.get().then((qsnap) => {
                    qsnap.forEach((doci) => {
                        doci.ref.delete().then(() => {
                            success();
                        }).catch(error => {
                            error1();
                            console.log(error);
                        });
                    })
                })
            }
        }
    };
    componentDidMount() {
        db.collection("Orders")
            .get()
            .then(querySnapshot => {
                const sdata = querySnapshot.docs.map(doc => doc.data());
                const Matches = [];
                sdata.forEach((e) => {
                    Matches.push(e);
                });
                this.setState({
                    Data: Matches
                })
            });
    }
    render() {
        return (
            <div>
                <MUIDataTable
                    title={"Beer Company"}
                    data={this.state.Data}
                    columns={columns}
                    options={this.options}
                />

            </div>

        );
    }

}
export default Orders;



