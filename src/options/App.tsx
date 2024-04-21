import { Container, Flex, Paper, Table, Title } from "@mantine/core";
import { AddButton } from "./AddButton";
import { Template } from "./types";
import { EditButton } from "./EditButton";
import { useEffect, useState } from "react";

function App() {
  const [templates, setTemplates] = useState<Template[]>([]);

  const update = (newTemplates: Template[]) => {
    setTemplates(newTemplates);

    chrome.storage.local.set({
      TEMPLATES: newTemplates,
    });
  };

  useEffect(() => {
    chrome.storage.local.get(["TEMPLATES"], (value) => {
      if (!value?.TEMPLATES) {
        return;
      }

      setTemplates(value.TEMPLATES);
    });
  }, []);

  return (
    <Container my="xl" size="sm">
      <Flex justify="space-between" align="center">
        <Title order={3}>定型文を設定</Title>
        <AddButton
          onAdd={(values) => {
            const newTemplates = [...templates, values];

            update(newTemplates);
          }}
        />
      </Flex>
      {templates.length > 0 && (
        <Paper mt="xl" shadow="md" withBorder>
          <Table
            highlightOnHover
            highlightOnHoverColor="var(--mantine-color-gray-1)"
          >
            <Table.Tbody>
              {templates.map((template, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{template.title}</Table.Td>
                  <Table.Td w={0}>
                    <EditButton
                      template={template}
                      onSave={(values) => {
                        const newTemplates = templates.map((t, i) => {
                          return i === index ? values : t;
                        });

                        update(newTemplates);
                      }}
                      onDelete={() => {
                        const newTemplates = templates.filter(
                          (_, i) => i !== index,
                        );

                        update(newTemplates);
                      }}
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
