import { Button, Card, MenuItem, Modal, Toggle } from "@ui-kitten/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { createItemRequest } from "../../redux/actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControllerInput } from "../commonComponents";
import { ITODOItem } from "../../redux/types";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import * as yup from "yup";

interface IModalAndFormForNewItem {
    visible: boolean,
    setVisible: (val: boolean) => void,
    parrentListID: string
}

type FormValues = {
    title: string,
    description: string,
    deadline: Date,
};

const ModalAndFormItem: React.FC<IModalAndFormForNewItem> = ({ visible, setVisible, parrentListID }) => {
    const schema = yup.object({
        title: yup.string().required("Required"),
        description: yup.string(),
        deadline: yup.date().default(new Date())
    })
    const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('ModalAndFormItem');
    }, []);

    const onSubmit: SubmitHandler<FormValues> = (item) => {
        console.log('onSubmit');
        
        setVisible(false);

        const Item: ITODOItem = {
            title: item.title,
            description: item.description == undefined ? '...' : item.description,
            deadline: item.deadline,
            isDone: false,
            TODOListId: parrentListID
        }

        dispatch(createItemRequest(Item));
        reset({ title: "", description: "", deadline: undefined });
    }

    return (
        <Modal
            style={{ width: "94%" }}
            visible={visible}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>

                <ControllerInput
                    control={control}
                    errors={errors.title}
                    nameController={"title"}
                    placeholder={'Enter title'}
                    isDate={false}
                />

                <ControllerInput
                    control={control}
                    errors={errors.description}
                    nameController={"description"}
                    placeholder={'Enter description'}
                    isDate={false}
                />

                <ControllerInput
                    control={control}
                    errors={errors.deadline}
                    nameController={"deadline"}
                    placeholder={"dd/mm/yy"}
                    isDate={true}
                />

                <Button status='success' onPress={handleSubmit(onSubmit)}>Submit</Button>

            </Card>
        </Modal>
    )
}

export const MemoizedModalAndFormItem = React.memo(ModalAndFormItem);