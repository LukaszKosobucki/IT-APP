import { Component } from "react";
import { getMyTeams } from '../../store/actions/myTeams'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>name</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.data.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

const Table = (props) => {
    const { data } = props

    return (
        <table>
            <TableHeader />
            <TableBody data={data} />
        </table>
    )
}

class MyTeamsPage extends Component {
    state = {
        teams: []
    }

    componentDidMount() {
        const teams = getMyTeams()
        this.setState({
            teams: teams
        });
    }

    render() {
        return (
            <form>
                <div>MyTeams</div>
                <Table data={this.state.teams} />
            </form>
        )
    }
}

export default MyTeamsPage;