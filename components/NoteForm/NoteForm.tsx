import css from "./NoteForm.module.css";
import { Field, Form, Formik,  ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
 
interface NoteFormValues {
    title: string,
    content: string,
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
}

interface NoteFormProps {
    onClose: () => void
}
const NoteFormSchema = Yup.object({
    title: Yup.string().min(3, "Title must be at least 3 characters")
        .max(50, "Title must be at most 50 characters")
        .required("Title is required"),
    content: Yup.string()
        .max(500, "Content must be at most 500 characters"),
    tag: Yup.string()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
        .required("Tag is required"),
});


export default function NoteForm({ onClose }: NoteFormProps) { 
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
                   }
    });

    const initialValues: NoteFormValues = {
        title: '',
        content: '',
        tag: "Todo",
    };


    const handleSubmit = (
        values: NoteFormValues,
    ) => {
        mutation.mutate(
            {
                 title: values.title,
                content: values.content,
                tag: values.tag
            }
        )
    };  

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={NoteFormSchema}
            onSubmit={handleSubmit}
        >
            
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field
                        id="title" type="text" name="title" className={css.input}
                    />
                    <ErrorMessage
                        component="span" name="title" className={css.error}
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field
                        id="content"
                        name="content"
                        as="textarea"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage name="content" component="span" className={css.error}
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field
                        id="tag"
                        name="tag"
                        as="select"
                        className={css.select}
                    >
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage
                        name="tag" component="span" className={css.error}
                    />
                </div>

                <div className={css.actions}>
                    <button
                        type="button" className={css.cancelButton} onClick={onClose}
                    >
                        Cancel
                    </button>
                    
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={mutation.isPending}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
          );   
      }