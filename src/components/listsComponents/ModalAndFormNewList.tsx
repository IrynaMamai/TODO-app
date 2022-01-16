import { Button, Card, Modal } from "@ui-kitten/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { createListRequest } from "../../redux/actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControllerInput } from "../commonComponents";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import * as yup from "yup";

interface IModalAndFormForNewList {
    visible: boolean,
    setVisible: (val: boolean) => void
}

type FieldValues = {
    nameList: string
}

const ModalAndFormNewList: React.FC<IModalAndFormForNewList> = ({ visible, setVisible }) => {
    const schema = yup.object({ nameList: yup.string().required("Required") })
    const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('ModalAndFormNewList');
    }, []);
    
    const onSubmit: SubmitHandler<FieldValues> = (list) => {
        console.log('onSubmit');
        
        dispatch(createListRequest(list));
        setVisible(false);
        reset({ nameList: "" });
    }

    return (
        <Modal
            visible={visible}
            backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>

                <ControllerInput
                    control={control}
                    errors={errors.nameList}
                    nameController={"nameList"}
                    placeholder={"Enter name list"}
                    isDate={false}
                />

                <Button status='success' onPress={handleSubmit(onSubmit)}>New list</Button>

            </Card>
        </Modal>
    )
}

export const MemoizedModalAndFormNewList = React.memo(ModalAndFormNewList);