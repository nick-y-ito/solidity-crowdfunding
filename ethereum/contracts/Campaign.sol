// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CampaignFactory {
    address payable[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(payable(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address payable[] memory) {
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

    struct Summary {
        address manager;
        uint256 minimumContribution;
        uint256 requestsCount;
        uint256 approversCount;
        uint256 balance;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalsCount = 0;
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

        payable(targetRequest.recipient).transfer(targetRequest.value);
        targetRequest.complete = true;
    }

    function getSummary() public view returns (Summary memory) {
        return Summary({
            manager: manager,
            minimumContribution: minimumContribution,
            requestsCount: requests.length,
            approversCount: approversCount,
            balance: address(this).balance
        });
    }
}
