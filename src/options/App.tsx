import { Container, Flex, Paper, Table, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AddButton } from "./AddButton";
import { Template } from "./types";
import { EditButton } from "./EditButton";

function App() {
  const form = useForm<{ templates: Template[] }>({
    initialValues: {
      templates: [],
    },
  });

  return (
    <Container my="xl" size="sm">
      <Flex justify="space-between" align="center">
        <Title order={3}>定型文設定</Title>
        <AddButton
          onAdd={(values) => form.insertListItem("templates", values)}
        />
      </Flex>
      {form.values.templates.length > 0 && (
        <Paper mt="xl" shadow="md" withBorder>
          <Table
            highlightOnHover
            highlightOnHoverColor="var(--mantine-color-gray-1)"
          >
            <Table.Tbody>
              {form.values.templates.map((template, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{template.title}</Table.Td>
                  <Table.Td w={0}>
                    <EditButton
                      template={template}
                      onSave={(values) => {
                        const newValues = form.values.templates.map(
                          (template, i) => {
                            return i === index ? values : template;
                          },
                        );

                        form.setFieldValue("templates", newValues);
                      }}
                      onDelete={() => form.removeListItem("templates", index)}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}

export default App;
