import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import { fetchAdmissionFeesInfo } from "../../../../ApiClient";
import CommonMatTable from "../../../../SharedComponents/CommonMatTable";

const AdmissionFeesView = () => {
    const [admissionFeesList, setAdmissionFeesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userData = JSON.parse(localStorage.getItem("UserData") || "{}");

    const fetchAdmissionFeesList = useCallback(async () => {
        setIsLoading(true);
        const payload = { "user_ids": [] };
        if (userData?.role === 'PARENT') {
            if(userData?.student_info?.length > 0) {
                payload.user_ids = userData.student_info.map(student => student.student_id);
            }
        }
        try {
            const response = await fetchAdmissionFeesInfo(payload);
            setAdmissionFeesList(response?.data?.admission_fees_data || []);
        } catch (err) {
            console.error("Failed to fetch admission fees list:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAdmissionFeesList();
    }, []);

    const columns = useMemo(
        () => [
            { accessorKey: "user_id", header: "User ID" },
            { accessorKey: "user_name", header: "Student Name" },
            { accessorKey: "parent_id", header: "Parent ID" },
            { accessorKey: "total_admission_charge", header: "Total Charge" },
            { accessorKey: "deposited_fees", header: "Deposited Fees" },
            { accessorKey: "total_installment_due", header: "Total Due" },
            { accessorKey: "total_emi_amount", header: "Total EMI Amount" },
            { accessorKey: "number_of_installments", header: "Installments" },
            { accessorKey: "installment_amount", header: "Installment Amount" },
            { accessorKey: "first_installment_due_date", header: "First Installment Due" },
            { accessorKey: "first_installment_paid_status", header: "First Installment Paid" },
            { accessorKey: "second_installment_due_date", header: "Second Installment Due" },
            { accessorKey: "second_installment_paid_status", header: "Second Installment Paid" },
            { accessorKey: "third_installment_due_date", header: "Third Installment Due" },
            { accessorKey: "third_installment_paid_status", header: "Third Installment Paid" },
            { accessorKey: "fourth_installment_due_date", header: "Fourth Installment Due" },
            { accessorKey: "fourth_installment_paid_status", header: "Fourth Installment Paid" },
            { accessorKey: "fifth_installment_due_date", header: "Fifth Installment Due" },
            { accessorKey: "fifth_installment_paid_status", header: "Fifth Installment Paid" },
            { accessorKey: "sixth_installment_due_date", header: "Sixth Installment Due" },
            { accessorKey: "sixth_installment_paid_status", header: "Sixth Installment Paid" },
        ],
        []
    );

    return (
        <CommonMatTable
            columns={columns}
            isLoading={isLoading}
            data={admissionFeesList}
            renderTopToolbar={() => <Typography variant="h6">Admission Fees</Typography>}
        />
    );
};

export default AdmissionFeesView;
