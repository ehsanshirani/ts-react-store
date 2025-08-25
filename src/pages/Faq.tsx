import { useState, type SyntheticEvent } from "react";

//mui
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const faqData = [
  {
    id: "panel1",
    question: "چگونه می‌توانم سفارش خود را ثبت کنم؟",
    answer:
      "برای ثبت سفارش، پس از انتخاب کالاهای مورد نظر و اضافه کردن آن‌ها به سبد خرید، وارد صفحه سبد خرید شده و با کلیک بر روی دکمه «ادامه فرآیند خرید»، سفارش خود را در چند مرحله ساده تکمیل کنید.",
  },
  {
    id: "panel2",
    question: "آیا امکان پرداخت در محل وجود دارد؟",
    answer:
      "بله، برای برخی از مناطق امکان پرداخت در محل فراهم است. در مرحله انتخاب روش پرداخت، می‌توانید گزینه‌های موجود برای آدرس خود را مشاهده کنید.",
  },
  {
    id: "panel3",
    question: "هزینه ارسال سفارش چگونه محاسبه می‌شود؟",
    answer:
      "هزینه ارسال بر اساس آدرس تحویل، وزن و حجم مرسوله محاسبه می‌شود. این هزینه در مرحله نهایی ثبت سفارش و قبل از پرداخت به شما نمایش داده خواهد شد.",
  },
  {
    id: "panel4",
    question: "سفارش من چه زمانی به دستم می‌رسد؟",
    answer:
      "زمان تحویل سفارش بستگی به موقعیت مکانی شما و نوع ارسال انتخابی دارد. سفارشات تهران معمولاً طی ۱ تا ۲ روز کاری و سفارشات شهرستان‌ها طی ۳ تا ۵ روز کاری تحویل داده می‌شوند.",
  },
  {
    id: "panel5",
    question: "هزینه ارسال سفارش چگونه محاسبه می‌شود؟",
    answer:
      "هزینه ارسال بر اساس آدرس تحویل، وزن و حجم مرسوله محاسبه می‌شود. این هزینه در مرحله نهایی ثبت سفارش و قبل از پرداخت به شما نمایش داده خواهد شد.",
  },
  {
    id: "panel6",
    question: "سفارش من چه زمانی به دستم می‌رسد؟",
    answer:
      "زمان تحویل سفارش بستگی به موقعیت مکانی شما و نوع ارسال انتخابی دارد. سفارشات تهران معمولاً طی ۱ تا ۲ روز کاری و سفارشات شهرستان‌ها طی ۳ تا ۵ روز کاری تحویل داده می‌شوند.",
  },
];

function Faq() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      console.log(event);
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container maxWidth="laptop" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 6, fontWeight: "bold" }}
      >
        سوالات متداول
      </Typography>

      {faqData.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          sx={{
            boxShadow: "none",
            border: "1px solid rgba(0, 0, 0, .125)",
            "&:not(:last-child)": {
              borderBottom: 0,
            },
            "&:before": {
              display: "none",
            },
            mb: 2,
            borderRadius: 2,
            "&.Mui-expanded": {
              margin: "16px 0",
            },
          }}
        >
          <AccordionSummary
            expandIcon={expanded === item.id ? <RemoveIcon /> : <AddIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
            sx={{
              "& .MuiAccordionSummary-content": {
                margin: "12px 0",
              },
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderTop: "1px solid rgba(0, 0, 0, .125)",
              pt: 3,
            }}
          >
            <Typography sx={{ color: "text.secondary" }}>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
export default Faq;
