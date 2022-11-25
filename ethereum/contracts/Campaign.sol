pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalsCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage targetRequest = requests[index];

        require(approvers[msg.sender]);
        require(!targetRequest.approvals[msg.sender]);

        targetRequest.approvals[msg.sender] = true;
        targetRequest.approvalsCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage targetRequest = requests[index];

        require(targetRequest.approvalsCount >= (approversCount / 2));
        require(!targetRequest.complete);

        targetRequest.recipient.transfer(targetRequest.value);
        targetRequest.complete = true;
    }
}
