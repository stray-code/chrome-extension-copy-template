import { Box, Button, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { Template } from "../options/types";
import { getLocalStorage } from "../utils";

function App() {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    (async () => {
      const templateList = await getLocalStorage("templateList");

      if (!templateList) {
        return;
      }

      setTemplates(templateList);
    })();
  }, []);

  return (
    <Box py="xs" px={5} miw={200} maw={400}>
      {templates.map((template, index) => (
        <Button
          key={index}
          variant="subtle"
          px="xs"
          fullWidth
          color="gray"
          c="dark"
          fw="normal"
          onClick={async () => {
            await navigator.clipboard.writeText(template.body);

            // すぐにウィンドウを閉じるとコピーできない場合があるため、待つ
            await new Promise((resolve) => setTimeout(resolve, 10));

            window.close();
          }}
          styles={{
            inner: { display: "block" },
          }}
        >
          {template.title}
        </Button>
      ))}
      <Divider my={5} />
      <Button
        variant="light"
        px="xs"
        fullWidth
        color="gray"
        c="dark"
        fw="normal"
        onClick={() => {
          chrome.runtime.openOptionsPage();
        }}
      >
        設定ページ
      </Button>
    </Box>
  );
}

export default App;
