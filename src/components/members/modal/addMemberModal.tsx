import Input from '../../input/input';
import { Modal } from '../../modal/modal';

interface AddMemberModalProps {
  onClose: () => void
}

export function AddMemberModal({ onClose }: AddMemberModalProps) {
  const handler = () => {
  };

  return (
    <Modal title="Invite people to My Projects" onClose={onClose}>
      <div className="modal-main__add-member">
        <p className="modal-main__title">Add a team member to your project</p>
        <Input type="text" placeholder="" value="" onChange={handler}/>
      </div>
      <div className="modal-main__add-project">
        <p className="modal-main__title">Add to projects</p>
        <Input type="text" placeholder="" value="" onChange={handler}/>
      </div>
      <button className="modal__add-btn">Add</button>
    </Modal>
  );
}
