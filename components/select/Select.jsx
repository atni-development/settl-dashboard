import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const Select = ({ data = [], btn = "", btnText = "" }) => {
  const [selected, setSelected] = useState(data[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="selector">
        <Listbox.Button className={btn}>
          {/* <Image src={selected?.icon} alt="icon" /> */}
          {/* <span className="fw-bold text-white ">{selected?.name}</span> */}
          <span className={btnText}>{selected?.name}</span>
        </Listbox.Button>
        <Transition as={Fragment}>
          <Listbox.Options>
            {data.map((itm) => (
              <Listbox.Option key={itm.id} value={itm}>
                {({ selected }) => (
                  <span className={selected ? "selected fw-semibold" : ""}>
                    {itm.name}
                    {selected}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
