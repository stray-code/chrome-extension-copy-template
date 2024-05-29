import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import type { Template } from "./types";

type Props = {
  template: Template;
  onSave: (values: Template) => void;
};

export const EditButton = ({ template, onSave }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      id: -1,
      title: "",
      body: "",
    },
  });

  return (
    <div>
      <ActionIcon
        variant="light"
        color="gray"
        c="dark"
        onClick={() => {
          form.setValues(template);
          open();
        }}
      >
        <IconPencil size={20} color="gray" />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title="定型文を編集"
        centered
        size="lg"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            onSave(values);
            close();
          })}
        >
          <Stack>
            <TextInput {...form.getInputProps("title")} label="タイトル" />
            <Textarea
              {...form.getInputProps("body")}
              rows={10}
              label="定型文"
            />
            <Flex justify="space-end">
              <Button type="submit">保存</Button>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </div>
  );
};
